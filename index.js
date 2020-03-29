exports.createForm = (data, config) => {
  const {
    keyMap,
    valueMap,
    blockMap
  } = getKeyValueMap(data.Blocks)

  // Get Key Value relationship
  const trimChars = config ? config.trimChars : undefined
  return getKeyValueRelationship(keyMap, valueMap, blockMap, trimChars)
}

exports.createTables = (data) => {
  const blocks = data.Blocks

  const blocksMap = {}
  const tableBlocks = []
  for (const block of blocks) {
    blocksMap[block.Id] = block
    if (block.BlockType === 'TABLE') {
      tableBlocks.push(block)
    }
  }
  const tableSets = []
  for (const table of tableBlocks) {
    tableSets.push(getRowsColumnsMap(table, blocksMap))
  }
  return tableSets
}

function getKeyValueMap (blocks) {
  // get key and value maps
  const keyMap = {}
  const valueMap = {}
  const blockMap = {}
  try {
    for (const block of blocks) {
      const blockId = block.Id
      blockMap[blockId] = block
      if (block.BlockType === 'KEY_VALUE_SET') {
        if (block.EntityTypes.includes('KEY')) { keyMap[blockId] = block } else { valueMap[blockId] = block }
      }
    }
  } catch (err) {
    console.log(err)
  }
  return {
    keyMap,
    valueMap,
    blockMap
  }
}

function getKeyValueRelationship (keyMap, valueMap, blockMap, trimChars) {
  const kvs = {}
  try {
    for (const keyBlock in keyMap) {
      const valueBlock = findValueBlock(keyMap[keyBlock], valueMap)
      let key = getText(keyMap[keyBlock], blockMap)
      const val = getText(valueBlock, blockMap)
      if (key.indexOf('.') > -1) {
        key = key.split('.').join('')
      }
      if (trimChars) {
        for (let i = 0; i < trimChars.length; i++) {
          if (trimChars[i] === ' ') {
            key = key.trim()
          } else {
            key = key.replace(trimChars[i], '')
          }
        }
      }
      kvs[key] = val
    }
  } catch (err) {
    console.error(err)
  }
  return kvs
}

function getText (result, blocksMap) {
  let text = ''
  try {
    if (result.Relationships) {
      for (const relationship of result.Relationships) {
        if (relationship.Type === 'CHILD') {
          for (const childId of relationship.Ids) {
            const word = blocksMap[childId]
            if (word.BlockType === 'WORD') {
              text = text + word.Text + ' '
            }
            if (word.BlockType === 'SELECTION_ELEMENT') {
              if (word.SelectionStatus === 'SELECTED') {
                text = text + 'X '
              }
            }
          }
        }
      }
    }
  } catch (err) {
    console.error(err)
  }
  return text
}

function findValueBlock (keyBlock, valueMap) {
  let valueBlock = null
  try {
    for (const relationship of keyBlock.Relationships) {
      if (relationship.Type === 'VALUE') {
        for (const valueId of relationship.Ids) {
          valueBlock = valueMap[valueId]
        }
      }
    }
  } catch (err) {
    console.error(err)
  }
  return valueBlock
}

function getRowsColumnsMap (tableResult, blocksMap) {
  const rows = {}
  try {
    for (const relationship of tableResult.Relationships) {
      if (relationship.Type === 'CHILD') {
        for (const childId of relationship.Ids) {
          const cell = blocksMap[childId]
          if (cell.BlockType === 'CELL') {
            const rowIndex = cell.RowIndex
            const colIndex = cell.ColumnIndex
            if (!rows[rowIndex]) {
              rows[rowIndex] = {}
            }
            rows[rowIndex][colIndex] = getText(cell, blocksMap)
          }
        }
      }
    }
  } catch (err) {
    console.error(err)
  }
  return rows
}
