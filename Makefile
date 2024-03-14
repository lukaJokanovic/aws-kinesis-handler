create-user-stream:
	docker exec -it aws-kinesis-handler-kinesalite-1 sh -c "aws --endpoint-url http://localhost:4567 kinesis create-stream --stream-name user-events --shard-count 1"

populate-data:
	docker exec -it aws-kinesis-handler-app-1 sh -c "yarn run populate"

manjaro-restart-docker:
	sudo snap disable docker
	sudo snap enable docker