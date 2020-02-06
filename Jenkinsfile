node {
	def app
	
	stage('Clone repository') {
		/* Let's make sure we have the repository cloned to our workspace */
		checkout scm
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
		app.inside {
        	    sh 'npm test'
        	}
	}
	stage('clean') {
		app.inside {
        	    sh 'rm -fr node_modules'
        	}
	}
    stage('Push image') {
        	docker.withRegistry('https://registry-1.docker.io/v2', 'docker-hub-credentials') {
			app.push("${env.BUILD_NUMBER}")
            app.push("latest")
		}
	}
}