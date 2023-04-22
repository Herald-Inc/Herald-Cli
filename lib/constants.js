export default {
  COMMANDS: {
    DEPLOY: 'cdk deploy --all --require-approval never',
    DESTROY: 'cdk destroy --all --force',
    DELETE_KEY: 'aws ec2 delete-key-pair --key-name',
    CREATE_KEY: 'aws ec2 create-key-pair --key-name',
    GET_VPCS: 'aws ec2 describe-vpcs',
    // GET_SUBNETS: 'aws ec2 describe-subnets --filters',
    // GET_AZS: 'aws ec2 describe-availability-zones',
  },
  KEY_NAME: 'herald-key',
  KEY_PATH: 'bin/herald-key.pem',
  REPO: 'https://github.com/Herald-Inc/Herald.git',
  APP_NAME: 'herald-app',
  CONFIG_PATH: 'user-config.json',
  APP_DEPENDENCIES: ["aws", "cdk", "git"],
}
