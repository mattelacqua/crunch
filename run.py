# Start up the front and back end
import src.utils as utils
# 
print("Starting Run Script")

print("Starting Webserver")
utils.start_webserver()

print("Compiling JS")
utils.compile_js()

print("Ending Run Script")
