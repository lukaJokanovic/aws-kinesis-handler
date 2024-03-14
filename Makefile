create-user-stream:
	docker exec -it aws-kinesis-handler-kinesalite-1 sh -c "aws --endpoint-url http://localhost:4567 kinesis create-stream --stream-name user-events --shard-count 1"

manjaro-restart-docker:
	sudo snap disable docker
	sudo snap enable docker