pipeline {
    agent any

    triggers {
        // Poll SCM approximately every minute for repository changes
        pollSCM('* * * * *')
    }

    stages {
        stage('Checkout') {
            steps {
                // Stage 1: Retrieve source code from the configured Git repository
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Stage 2: Clean install reproducible dependencies using package-lock.json
                // Note: The Jenkins execution agent must have Node.js and npm installed and available on PATH
                script {
                    if (isUnix()) {
                        sh 'npm ci'
                    } else {
                        bat 'npm ci'
                    }
                }
            }
        }

        stage('Automated Tests') {
            steps {
                // Stage 3: Run Jest automated test suite; fails pipeline if any test fails
                script {
                    if (isUnix()) {
                        sh 'npm test'
                    } else {
                        bat 'npm test'
                    }
                }
            }
        }

        stage('Package Application') {
            steps {
                // Stage 4: Package the application into a .tgz artifact in dist/
                script {
                    if (isUnix()) {
                        sh 'npm run package'
                    } else {
                        bat 'npm run package'
                    }
                }
            }
        }

        stage('Archive Artifact') {
            steps {
                // Stage 5: Archive the build artifact in Jenkins for distribution
                archiveArtifacts artifacts: 'dist/*.tgz', fingerprint: true
            }
        }
    }
}
