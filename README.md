# Aws Textract Helper
This is a library (still in beta) aims to simplify and provide an easy to use methods that can help extracting meaningful data from Amazon Textract APIs.
Currently it only supports forms but we are working on a plan to support other features and publish it as an open source project.
For now, you can freely use it to extract forms.

# Installing
```
npm i aws-textract-helper
```

# Example
```
const textractHelper = require('aws-textract-helper')
const form = textractHelper.createForm(dataFromTextract)
```