@Library('utils@master') _
import com.lmig.intl.cloud.jenkins.util.EnvConfigUtil
import groovy.json.JsonOutput

def packageVersion = ""
def NAMESONAR = "intl-co-habeas-data-consulta-frontend"
def envUtil = new EnvConfigUtil()
def countryParams = envUtil.getCountryEnvDetails(env.JOB_NAME)
echo "Working in env: ${countryParams.countryEnv}"

def appEnv=countryParams.countryEnv.toLowerCase()
def branch = env.BRANCH_NAME;
def projectDir  = '.'

def bucket = "consultahabeasdata-${appEnv}"

def customWorkerImage = ['node=artifactory-emea.aws.lmig.com/pod-templates-emea/node:14-alpine']

pipeline {
  agent {
		kubernetes {
			yaml pod(mode:'Declarative', workers:customWorkerImage)
		}
  }
  stages {
		stage('Git Checkout') {
			steps {
			checkout scm
			}
		}

		stage("Read package.json") {
			steps {
				script {
					dir(projectDir){
						def props = readJSON file: 'package.json'
						packageVersion = "${props.version}"
						appName =  "${props.name}"
					}
					zipFileGenerated = appName + '-' + packageVersion + '.zip'
				}
			}
		}
	
	// stage('Validate Dev Env'){
	// 	when {
	// 		expression {
	// 			return countryParams.countryEnv.toLowerCase() == "dev";
	// 		}
	// 	}
	// 	steps {
	// 		script{
	// 			dir(projectDir){
	// 				if (branch != "master" && packageVersion.contains("-beta")) {
	// 					packageVersion = packageVersion + '-' + currentBuild.startTimeInMillis
	// 					echo "Continue with dev build";
	// 				} else {
	// 					currentBuild.result = 'FAILURE';
	// 					error("Project version must be a beta artifact");
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	// stage('Validate nonProd Env'){
	// 	when {
	// 		expression {
	// 			return countryParams.countryEnv.toLowerCase() == "nonprod";
	// 		}
	// 	}
	// 	steps {
	// 		script{
	// 			dir(projectDir){
	// 				if (buildingTag() && packageVersion.contains("-rc")) {
	// 					echo "Continue with nonprod build";
	// 				} else {
	// 					currentBuild.result = 'FAILURE';
	// 					error("Project version must be a RELEASE artifact");
	// 				}              		
	// 			}
	// 		}
	// 	}
	// }

	stage('Test Sonar') {
	  steps{
		withSonarQubeEnv('sonarqube') {
		  sh "sonar-scanner -Dsonar.projectKey=${NAMESONAR} -Dsonar.projectName=${NAMESONAR} -Dsonar.projectVersion=${packageVersion} -Dsonar.branch.name=${appEnv}"
		}
	  }
	}

	stage('install') {
	  steps{
		container("node") {
		  sh 'node --version'
		  sh 'npm --version'
		  sh 'npm install'
		  sh 'pwd'
		  sh 'ls'
		}
	  }
	}

	stage('Front Deploy') {
	  steps {
		script {
		  if (countryParams.countryEnv.toLowerCase() == "nonprod") {
			deployToNonProd {
			  container("node") {
				sh """
					ls -lha
					npm i
					npm run build:nonprod
					ls -lha
					"""
			  }
			  sh 'ls -lha'
			  sh 'aws --version'
			  sh "aws s3 sync build s3://${bucket} --delete"
			  sh "aws s3 cp build s3://${bucket} --recursive --metadata-directive REPLACE --recursive --cache-control max-age=0,no-cache,no-store,must-revalidate"
			  sh 'aws cloudfront create-invalidation --distribution-id E3N67K3T57E65Q --paths "/*"'
			}
		  }
		  else {
			deployToDev{
			  container("node") {
				sh """
					ls -lha
                    npm install
                    CI=false npm run build:dev
                    ls -lha
					"""
				}
			  sh 'ls -lha'
			  sh 'aws --version'
			  sh "aws s3 sync build s3://${bucket} --delete"
			  sh "aws s3 cp build s3://${bucket} --recursive --metadata-directive REPLACE --recursive --cache-control max-age=0,no-cache,no-store,must-revalidate"
			  sh 'aws cloudfront create-invalidation --distribution-id E3N67K3T57E65Q --paths "/*"'
			}
		  }
		}
	  }
	}
  }
}