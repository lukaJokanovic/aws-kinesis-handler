# aws-kinesis-handler

This is a simple stream handler that listens for records added to stream.

- [Prerequisites](#prerequisites)
- [Commands](#commands)
- [Answers](#answers)

## Prerequisites

### Docker

Check the official [`Docker documentation`](https://docs.docker.com/engine/) for information how to install Docker on your operating system.

### make

Check the official [`make documentation`](https://www.gnu.org/software/make/) for information how to install make on your operating system.

### docker-compose

All env variables are defined in docker-compose file.

## Commands

1. To test the whole flow there are 4 steps that need to be executed in specified order:
    * `docker-compose up --build kinesalite --detach` this will start up kinesis container
    * `make create-user-stream` this will create user stream
    * `docker-compose up --build app` this will start up app container
    * from another terminal: `make populate-data` this will insert data into kinesis

Note: app will not stay up if user stream does not exist

2. Detailed coverage can be seen with this command: `yarn run coverage`

3. All other commands can be seen in package.json

## Answers

1. What I found appealing about the task was the opportunity to research an unfamiliar technology like AWS Kinesis. Despite lacking prior experience with AWS, the challenge of learning about Kinesis intrigued me. By studying the documentation and drawing parallels with my existing knowledge of RabbitMQ, I was able to formulate a solution to the problem at hand.

However, the most challenging aspect for me was navigating through the complexity of AWS Kinesis due to my lack of prior exposure. Despite this, I appreciated the chance to expand my skill set and explore new technologies.

While I believe the task was generally well-defined, there is room for refinement without compromising its quality. Certain areas within the task could benefit from clearer specifications or guidelines, which would streamline the execution process and enhance overall clarity. 

2. If tasked with storing UserLimit entries in a database for efficient retrieval and display on the front-end, I would recommend document based database, and having in mind service is hosted on AWS, I would recommend utilizing Amazon DynamoDB.

DynamoDB is a fully managed service provided by AWS, which means it handles administrative tasks such as hardware provisioning, setup, configuration, scaling, backups and seamlessly integrates with other AWS services. It is designed for seamless scalability and offers low-latency performance, allowing the database to handle large amounts of data and varying levels of throughput without compromising performance. 

If I was tasked with making this change possible, I would create following tasks:

* Database Schema Design: Define the schema for the UserLimit entries in DynamoDB, including key attributes and indexes for efficient querying.

* Data Migration: Develop a strategy for migrating existing UserLimit data from its current storage solution to DynamoDB. This may involve writing scripts or utilizing AWS Data Migration Services for large-scale data migration.

* Backend Integration: Modify the backend application logic to interact with DynamoDB instead of the previous storage solution. This includes updating event handlers, API endpoints, and any other components that interact with UserLimit data.

* Frontend Integration: Update the front-end components to fetch UserLimit data from DynamoDB through appropriate API calls. This may involve updating data fetching logic, UI components, and error handling mechanisms.

* Testing and Quality Assurance: Conduct thorough testing to ensure the reliability, scalability, and performance of the new implementation. This includes unit tests, integration tests, and end-to-end tests to validate the functionality from both backend and frontend perspectives.

* Deployment and Monitoring: Deploy the changes to production environment using appropriate deployment pipelines and tools. Set up monitoring and alerting mechanisms to detect any issues or performance bottlenecks in real-time.

3. I would suggest JSON format. There would be 2 APIs:

* `GET /user-limits/{limitId}` for fetching limit by limitId

```json
{
    "userId": "123",
    "value": "1000",
    "progress": "750",
    ...
}
```

* `GET /user-limits/user/{userId}` for fetching all users limits by userId

```json
[
	{
		"limitId": "123",
		"value": "1000",
		"progress": "750",
		...
	},
    ...
]
```

4. When dealing with event driven arhitecture, there are a few rules that I follow:

* Designing event handlers in a modular way, where each handler is responsible for a specific type of event or data entity. This allows us to reuse and extend individual handlers for similar use cases.

* Implement a flexible event routing mechanism that can route events to appropriate handlers based on their type or attributes. This allows us to handle different types of events within the same infrastructure.

* Define generic event schemas that can accommodate various types of data payloads. We should avoid hardcoding specific data structures into event schemas, making them adaptable to different use cases.

* Using dynamic configuration to specify event processing rules, such as which handlers to invoke for certain events or how to transform event data. This allows for easy configuration changes and reuse across different scenarios.

* Implementing integration patterns such as publish-subscribe or message queuing to decouple event producers from consumers. This promotes reusability by allowing multiple consumers to subscribe to relevant events.