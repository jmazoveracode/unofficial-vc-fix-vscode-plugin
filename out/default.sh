#!/bin/bash

# Set default values for file-path and workspace-path
file_path=""
workspace_path=""

# Parse command-line arguments
while [[ "$#" -gt 0 ]]; do
    case "$1" in
        --file-path) file_path="$2"; shift ;;
        --workspace-path) workspace_path="$2"; shift ;;
        *) echo "Unknown option: $1"; exit 1 ;;
    esac
    shift
done

# Check if the required arguments are provided
if [ -z "$file_path" ] || [ -z "$workspace_path" ]; then
    echo "Usage: $0 --file-path <file-path> --workspace-path <workspace-path>"
    exit 1
fi

echo ""
echo ""

# Green text with ANSI escape sequences
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${GREEN}Running on file \"$file_path\", in the workspace: \"$workspace_path\"${NC}"

echo ""
echo ""

# You can add your logic here...
# I/O Test - Loop to prompt user for input and return it in reverse
while true; do
    echo ""
    read -p "Enter text (or type 'exit' to exit): " user_input
    echo ""

    if [ "$user_input" == "exit" ]; then
        break
    else
        reversed_input=$(echo "$user_input" | rev)
        echo "Reversed text: $reversed_input"
        echo ""
    fi
done
