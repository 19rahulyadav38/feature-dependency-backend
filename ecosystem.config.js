// development-server deployment command: pm2 deploy ecosystem.config.js development-server
// Start with pm2 on server for environment `development-server`: pm2 start npm --name "superOne" -- run "development-server"

// staging deployment command: pm2 deploy ecosystem.config.js staging
// Start with pm2 on server for environment `staging`: pm2 start npm --name "superOne" -- run "staging"

// pre-production deployment command: pm2 deploy ecosystem.config.js pre-production
// Start with pm2 on server for environment `pre-production`: pm2 start npm --name "superOne" -- run "pre-production"

module.exports = {
    apps: [{
        name: 'feature-dependency-backend',
        script: 'index.js',
        instances: 'max',
        exec_mode: 'cluster',
        autorestart: true,
        watch: false,
        mergeLogs: true,
    }],

    deploy: {
        'production': {
            user: 'ubuntu',
            host: '34.219.114.198',
            ref: 'origin/main',
            repo: 'git@github.com:amrendraw3/feature-dependency-backend.git',
            path: '/home/ubuntu/feature-dependency-backend',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js && git reset --hard',
            env: {
                NODE_ENV: 'production',
            },
        },
        'quick-dev': {
            user: 'ubuntu',
            host: '13.40.157.105',
            ref: 'origin/main',
            repo: 'git@github.com:amrendraw3/feature-dependency-backend.git',
            path: '/home/ubuntu/feature-dependency-backend',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js && git reset --hard',
            env: {
                NODE_ENV: 'quick-dev',
            },
        },
        'quick-dev1': {
            user: 'ubuntu',
            host: '18.168.99.113',
            ref: 'origin/main',
            repo: 'git@github.com:amrendraw3/feature-dependency-backend.git',
            path: '/home/ubuntu/feature-dependency-backend',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js  && git reset --hard',
            env: {
                NODE_ENV: 'quick-dev1',
            },
        },
        'quick-dev2': {
            user: 'ubuntu',
            host: '18.171.5.79',
            ref: 'origin/main',
            repo: 'git@github.com:amrendraw3/feature-dependency-backend.git',
            path: '/home/ubuntu/feature-dependency-backend',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js  && git reset --hard',
            env: {
                NODE_ENV: 'quick-dev2',
            },
        },
        'quick-dev3': {
            user: 'ubuntu',
            host: '18.169.47.182',
            ref: 'origin/main',
            repo: 'git@github.com:amrendraw3/feature-dependency-backend.git',
            path: '/home/ubuntu/feature-dependency-backend',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js  && git reset --hard',
            env: {
                NODE_ENV: 'quick-dev3',
            },
        },
        'quick-dev4': {
            user: 'ubuntu',
            host: '13.41.111.253',
            ref: 'origin/main',
            repo: 'git@github.com:amrendraw3/feature-dependency-backend.git',
            path: '/home/ubuntu/feature-dependency-backend',
            'post-deploy': 'npm install && pm2 reload ecosystem.config.js  && git reset --hard',
            env: {
                NODE_ENV: 'quick-dev4',
            },
        }
    },
};
