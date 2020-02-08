node {
	def app
	
	stage('Clone repository') {
		/* Let's make sure we have the repository cloned to our workspace */
		checkout scm
	}
	stage('set status') {
            githubNotify status: "PENDING"
	}
	stage('Build image') {
		app = docker.build('gamegine/unit-test')
	}
	stage('install') {
		app.inside {
        	    sh 'npm install'
        	}
	}
	stage('test') {
		catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
            app.inside {
        	    sh 'npm test'
        	}
        }
	}
	stage('clean') {
		app.inside {
        	    sh 'rm -fr node_modules'
        	}
	}
	stage('set commit test result'){
		/*
		success {
            githubNotify status: "SUCCESS", credentialsId: "my-credentials-id", account: "my-account", repo: "my-repo"
        }
        failure {
            githubNotify status: "FAILURE", credentialsId: "my-credentials-id", account: "my-account", repo: "my-repo"
        }
		*/
	}
    /*
    stage('Push image') {
        	docker.withRegistry('https://registry-1.docker.io/v2', 'docker-hub-credentials') {
			app.push("${env.BUILD_NUMBER}")
            app.push("latest")
		}
	}
    */
}