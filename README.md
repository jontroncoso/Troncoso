# What do we got here?

Welcome! I'm [Jon Troncoso](https://jon.tronco.so) and this is my resume. It was created in less than a week and can be deployed using terraform in less than a minute.

# Frontend

The frontend is a single-page (literally only one route) SPA built in react-native using expo and nativewind. This would allow me to easily use the same codebase to build iOS, android, and web Apps.

# Deployment

Running `npm run deploy` uses terraform to build, and deploy this codebase to AWS. It moves the `/dist` folder to an S3 bucket and then creates a Cloudfront Distribution to serve these files statically over a Route53 hosted zone. The entire setup costs me approximately $0.40/month. However, I would be just as proficient managing a kubernetes cluster in EKS to manage microservices, or a good old fashioned ELB/EC2 set up with traditional servers.

# Backend

As of now, this codebase has no backend. I might add a contact form for the sake of demonstrating my proficiency with engineering in the future. If I did, I would likely leverage step functions, DynamoDB, and lambdas as they would be most cost effective to do. However, I'd be just as comfortable using a framework like Ruby on Rails, Laravel, Django, ExpressJS, Apollo, Nest, or really any other frameworks.
