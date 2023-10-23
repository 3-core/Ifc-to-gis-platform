pipeline {
    agent any
// 배포테스트
    environment {
        IMAGE_NAME = 'ghcr.io/kjis256/lfc-to-gis-platform:latest'
        IMAGE_TAG = 'latest'
        GITHUB_REGISTRY_CREDENTIAL = credentials('GIT_REPO_CRED')

    }

    stages {
        // stage('Docker Login') {
        //     steps {
        //         script {
        //             withCredentials([string(credentialsId: 'CI_REGISTRY_PSW', variable: 'CI_REGISTRY_PSW')]) {
        //                 sh 'echo "$CI_REGISTRY_PSW" | docker login --username "$CI_REGISTRY_USR" --password-stdin $CI_REGISTRY'
        //             }
        //         }
        //     }
        // }
        stage('Docker Login') {
            steps {
            script {
                     sh "docker login ghcr.io -u $GITHUB_REGISTRY_CREDENTIAL_USR -p $GITHUB_REGISTRY_CREDENTIAL_PSW"
                }
            }
        }

        stage('Dockerize') {
            when {
                expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
            }
            steps {
                script {
                    try {
                        sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG -f Dockerfile .'
                        sh 'docker push $IMAGE_NAME:$IMAGE_TAG'
                    } catch (Exception err) {
                        echo "Dockerize failed with error: ${err}"
                        currentBuild.result = 'FAILURE'
                        throw err
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
            }
            steps {
                script {
                    try {
                        sh 'docker pull $IMAGE_NAME:$IMAGE_TAG'
                        sh ''' 
                            if docker ps -a | grep -q 'Ifc-to-gis-platform'; then 
                                docker stop Ifc-to-gis-platform && docker rm Ifc-to-gis-platform; 
                            fi
                            docker run -d --name Ifc-to-gis-platform --restart=unless-stopped -p 18089:8080 $IMAGE_NAME:$IMAGE_TAG
                        '''
                    } catch (Exception err) {
                        echo "Deploy failed with error: ${err}"
                        currentBuild.result = 'FAILURE'
                        throw err
                    }
                }
            }
        }
    }
}
