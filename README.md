# Aws Textract Helper
This module aims to simplify and provide an easy to use methods that can help extracting meaningful data from Amazon Textract APIs.
Currently it only supports forms but we are working on a plan to support other features and publish it as an open source project.
For now, you can freely use it to extract forms.

To use it, simply pass the data you get from Textract into the "createForm" function.

const textractHelper = require('aws-textract-helper')
const form = textractHelper.createForm(data)
