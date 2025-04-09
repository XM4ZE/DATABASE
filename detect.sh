#!/bin/bash

search_dir="/var/lib/pterodactyl/volumes"
js_patterns=("ddos.js" "ddos2.js" "dos.js" "ddosl4.js" "booter.py" "attack.php" "dos.php" "ddos.php")
txt_pattern="*.txt"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
RESET='\033[0m'

echo -e "${CYAN}========= ADVANCED CONTENT SEARCHER =========${RESET}"
echo -e "${YELLOW}Directory:${RESET} $search_dir"
echo -e "${YELLOW}Start Time:${RESET} $(date +"%Y-%m-%d %H:%M:%S")\n"

# Fungsi pencarian IP di file txt
search_ip_in_txt() {
    local found=0
    echo -e "${PURPLE}[SEARCHING IP ADDRESSES IN TXT FILES]${RESET}"
    
    while IFS= read -r -d $'\0' file_path; do
        # Cari IP address (hanya ambil 1 baris pertama)
        ip_match=$(grep -m 1 -E -o --color=always "\b([0-9]{1,3}\.){3}[0-9]{1,3}\b" "$file_path" 2>/dev/null)
        
        if [ -n "$ip_match" ]; then
            echo -e "\n${GREEN}■ TXT File Found:${RESET} ${BLUE}$file_path${RESET}"
            echo -e "${YELLOW}Last Modified:${RESET} $(date -r "$file_path" +"%Y-%m-%d %H:%M:%S")"
            echo -e "${YELLOW}First IP Found:${RESET} $ip_match"
            ((found++))
        fi
    done < <(find "$search_dir" -type f -name "$txt_pattern" -print0 2>/dev/null)

    [ $found -eq 0 ] && echo -e "${RED}No IP addresses found in txt files.${RESET}"
    echo ""
}

search_in_js() {
    local found=0
    echo -e "${PURPLE}[SEARCHING IN JS FILES]${RESET}"
    
    # Daftar yang akan dicari
    declare -A search_terms=(
         ["ddos"]="DDoS"
         ["proxy"]="Proxy"
         ["flood"]="Flood"
         ["booter"]="Booter"
         ["stresser"]="Stresser"
         ["botnet"]="Botnet"
         ["LOIC"]="LOIC Tool"
         ["slowloris"]="Slowloris"
         ["syn-flood"]="SYN Flood"
         ["attack_launch"]="Attack Function"
         ["target_ip"]="Target IP"
    )
    
    for pattern in "${js_patterns[@]}"; do
        while IFS= read -r -d $'\0' file_path; do
            file_matches=""
            
            # Cari setiap term dalam file
            for term in "${!search_terms[@]}"; do
                match=$(grep -m 1 -i --color=always "$term" "$file_path" 2>/dev/null)
                if [ -n "$match" ]; then
                    file_matches+="    ${YELLOW}${search_terms[$term]}:${RESET} $match\n"
                fi
            done
            
            if [ -n "$file_matches" ]; then
                echo -e "\n${GREEN}■ JS File Found:${RESET} ${BLUE}$file_path${RESET}"
                echo -e "${YELLOW}Last Modified:${RESET} $(date -r "$file_path" +"%Y-%m-%d %H:%M:%S")"
                echo -e "$file_matches"
                ((found++))
            fi
        done < <(find "$search_dir" -type f -name "$pattern" -print0 2>/dev/null)
    done

    [ $found -eq 0 ] && echo -e "${RED}No matches found in JS files.${RESET}"
    echo ""
}

search_ip_in_txt
search_in_js

echo -e "${CYAN}============== SEARCH COMPLETED ==============${RESET}"
echo -e "${YELLOW}End Time:${RESET} $(date +"%Y-%m-%d %H:%M:%S")"
echo -e "${CYAN}==============================================${RESET}"