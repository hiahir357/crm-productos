DELAY=15
CURRENT_DIR="."
SERVER_DIR="/server"
CLIENT_DIR="/client"
NODE_MODULES_DIR="/node_modules"

function verify_node_modules() {
    output=($(find . -wholename $CURRENT_DIR$CLIENT_DIR$NODE_MODULES_DIR -type d))
    if [ "${#output[@]}" -eq 0 ]
    then 
        echo "Instalando dependencias del cliente..."
        $(cd $1 && npm install && cd ..)
    fi

    output=($(find . -wholename $CURRENT_DIR$SERVER_DIR$NODE_MODULES_DIR -type d))
    if [ "${#output[@]}" -eq 0 ]
    then 
        echo "Instalando dependencias del servidor..."
        $(cd $1 && npm install && cd ..)
    fi
}

function run_server() {
    echo "Running server"
    cd $CURRENT_DIR$SERVER_DIR && npm run dev
}

function run_client() {
    echo "Running client"
    cd $CURRENT_DIR$CLIENT_DIR && npm run dev
}



verify_node_modules
run_server &
sleep $DELAY
run_client &
wait