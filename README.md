![herald-logo](https://github.com/Herald-Inc/Herald-Cli/blob/main/img/herald-logo.png)

![shields.io](https://img.shields.io/badge/npm-v1.0.13-blue)
![shields.io npm license badge](https://img.shields.io/badge/license-ISC-brightgreen)

## Table of Contents 
- [Installation](#installation)
- [Geting Started](#getting-started)
- [Deploying to AWS](#deploying-to-aws)
- [Tearing Down Herald](#tearing-down-herald)

# Installation

```
$ npm install -g herald-cli
```

## Getting Started
To complete initialization successfully, the user must have aws-cli, aws-cdk and git-cli installed.

The AWS CLI must also be configured by running the `aws configure` command. In particular, both a default account and a default region must be specified, as those become environment variables necessary for the successful deployment of the Herald application.

To initialize Herald and ensure your environment is ready for deployment, run:

```
$ herald init
```

## Deploying to AWS
Once Herald has been initialized, it is ready to be deployed to AWS:

```
$ herald deploy
```
 
Using the host machine's default AWS account, the Herald CLI will pull a list of all existing VPCs from that AWS account, after which the user will be prompted to select the VPC into which they wish to deploy Herald. In order for the user's application to communicate with Herald without additional configuration, Herald must be deployed into the same VPC as the user's application.
 
Select a VPC and confirm your choice.

**Note:** The deployment can take upwards of 40 minutes.

## Tearing down Herald
To delete Herald from AWS, run:

```
$ herald destroy
```
