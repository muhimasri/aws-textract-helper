# AWS Textract Helper
This is a JavaScript library that provides an easy to use methods for extracting structured data from Amazon Textract APIs.

## Prerequisites
You need to have a basic knowledge of AWS and Textract APIs. For a quick introduction, please refere to [this article](https://levelup.gitconnected.com/convert-a-form-image-to-an-html-form-using-amazon-textract-and-nodejs-d4d7c1a2b0c5) and [repository example](https://github.com/muhimasri/aws-textract-app) to help you getting started.

## Installation
```
npm i aws-textract-helper
```

## Documentation
| Method        | Description   |
| ------------- | ------------- |
| createForm    | Analyze blocks returned by Textract and creates a key-value object that represents a form in an image |
| createTables  | Analyze blocks returned by Textract and creates an array of tables that represents all the tables in an image |

## Examples

### Create a form
![alt text](https://livecords-dev.s3.us-west-2.amazonaws.com/form-application-small.jpg-1585509821204 "Members Table")
```
const textractHelper = require('aws-textract-helper')
const form = textractHelper.createForm(dataFromTextract)
```
It will analyze all blocks and return a JSON object representing a form
```
{
    "First Name": "Muhi",
    "Last Name": "Masri",
    "Address": "Planet Earth"
}
```
### Create tables
![alt text](https://livecords-dev.s3.us-west-2.amazonaws.com/member-table.PNG-1585509527854 "Members Table")
```
const textractHelper = require('aws-textract-helper')
const tables = textractHelper.createTables(dataFromTextract)
```
It will analyze all blocks and return an array of tables
```
[{
	"1": {
		"1": "Memberld",
		"2": "First Name",
		"3": "Last Name",
		"4": "Address"
	},
	"2": {
		"1": "111",
		"2": "Muhi",
		"3": "Masri",
		"4": "Planet Earth"
	},
	"3": {
		"1": "222",
		"2": "John",
		"3": "Smith",
		"4": "Planet Mars"
	}
}]
```

## Extra options
You can use a trimChar config option to remove unwanted characters in form keys such as a colon or extra spaces
```
const form = textractHelper.createForm(dataFromTextract, { trimChars: [':', ' '] })
```
