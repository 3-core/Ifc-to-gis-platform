pipeline {
    agent any

    environment {
        CI = 'false'
        IMAGE_NAME = 'ahci/lfc-to-gis-platform'
        IMAGE_TAG = 'latest'
        TAR_FILE_NAME = 'Ifc-to-gis-platform.tar'
        CI_REGISTRY = credentials('CI_REGISTRY')
    }

    stages {
        stage('Docker Login') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'CI_REGISTRY_PSW', variable: 'CI_REGISTRY_PSW')]) {
                        sh 'echo "$CI_REGISTRY_PSW" | docker login --username "$CI_REGISTRY_USR" --password-stdin $CI_REGISTRY'
                    }
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
                        sh 'docker build -t $CI_REGISTRY_IMAGE:$IMAGE_TAG -f Dockerfile .'
                        sh 'docker push $CI_REGISTRY_IMAGE:$IMAGE_TAG'
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
                        sh 'docker pull $CI_REGISTRY_IMAGE:$IMAGE_TAG'
                        sh ''' 
                            if docker ps -a | grep -q 'Ifc-to-gis-platform'; then 
                                docker stop Ifc-to-gis-platform && docker rm Ifc-to-gis-platform; 
                            fi
                            docker run -d --name Ifc-to-gis-platform --restart=unless-stopped -p 18089:8080 $CI_REGISTRY_IMAGE:$IMAGE_TAG
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
