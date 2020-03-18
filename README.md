# Aws Textract Helper
This is a JavaScript library (still in beta) aims to simplify and provide an easy to use methods that can help extracting meaningful data from Amazon Textract APIs. Currently it only supports forms (FeatureTypes: ['FORMS']) but we are working on a plan to support other features including tables and publish it as an open source project. For now, you can freely use it to extract forms.

# Installing
```
npm i aws-textract-helper
```

# Example
```
const textractHelper = require('aws-textract-helper')
const form = textractHelper.createForm(dataFromTextract)
```
It will analyze all blocks and return a JSON object representing the form
```
{
    "First Name": "John",
    "Last Name": "Smith",
    "Address": "Planet Earth"
}
```

# Config Option
You can use a trimChar config option to remove unwanted characters in form keys such as a colon or extra spaces
```
const form = textractHelper.createForm(dataFromTextract, { trimChars: [':', ' '] })
```
