# Variables
LOG_FILE=app.log

.PHONY: dev clean

dev:
	npm start 2>&1 | tee -a ./$(LOG_FILE)

# Clear the log file at the root
clean:
	> $(LOG_FILE)