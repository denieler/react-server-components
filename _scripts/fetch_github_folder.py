import sys
import requests
import re

GITHUB_API_URL = "https://api.github.com"

def parse_github_url(url):
    """
    Parses a GitHub repository folder URL into its components.
    Example: https://github.com/facebook/react/tree/main/packages/react-server-dom-esm
    Returns: repo_owner, repo_name, branch, folder_path
    """
    match = re.match(
        r"https://github\.com/(?P<owner>[^/]+)/(?P<repo>[^/]+)/tree/(?P<branch>[^/]+)/(?P<path>.+)",
        url,
    )
    if not match:
        raise ValueError("Invalid GitHub repository folder URL")
    return match.group("owner"), match.group("repo"), match.group("branch"), match.group("path")

def fetch_folder(repo_owner, repo_name, folder_path, branch="main"):
    """
    Fetches all files recursively from a public GitHub repository folder.
    """
    url = f"{GITHUB_API_URL}/repos/{repo_owner}/{repo_name}/contents/{folder_path}?ref={branch}"
    response = requests.get(url)
    response.raise_for_status()
    return response.json()

def download_file(file_url):
    """
    Downloads the content of a file from GitHub.
    """
    response = requests.get(file_url)
    response.raise_for_status()
    return response.text

def process_folder(repo_owner, repo_name, folder_path, branch="main"):
    """
    Recursively processes a folder to get all file contents.
    """
    files_data = []
    items = fetch_folder(repo_owner, repo_name, folder_path, branch)

    for item in items:
        if item["type"] == "file":
            file_content = download_file(item["download_url"])
            files_data.append((item["path"], file_content))
        elif item["type"] == "dir":
            files_data.extend(process_folder(repo_owner, repo_name, item["path"], branch))

    return files_data

def write_combined_file(files_data, output_file):
    """
    Writes all file contents into a single text file with the specified format.
    """
    with open(output_file, "w", encoding="utf-8") as f:
        for file_path, content in files_data:
            f.write("-----------------------\n")
            f.write(f"[{file_path}]\n")
            f.write(content)
            f.write("\n-----------------------\n\n")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python fetch_github_folder.py <github_repo_folder_url>")
        sys.exit(1)

    try:
        # Parse the URL and extract repository details
        url = sys.argv[1]
        repo_owner, repo_name, branch, folder_path = parse_github_url(url)
        output_file = "combined_output.txt"

        print(f"Fetching folder data from {url}...")
        files_data = process_folder(repo_owner, repo_name, folder_path, branch)

        print("Writing combined output file...")
        write_combined_file(files_data, output_file)

        print(f"Combined file created: {output_file}")
    except Exception as e:
        print(f"Error: {e}")
