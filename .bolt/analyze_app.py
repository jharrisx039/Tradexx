import os
import json

def analyze_directory(directory):
    """
    Analyze the directory to identify all React-related files and their structure.
    """
    app_structure = {"components": [], "pages": [], "utils": [], "others": []}

    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(".jsx") or file.endswith(".tsx"):
                relative_path = os.path.relpath(os.path.join(root, file), directory)
                if "components" in root:
                    app_structure["components"].append(relative_path)
                elif "pages" in root:
                    app_structure["pages"].append(relative_path)
                elif "utils" in root:
                    app_structure["utils"].append(relative_path)
                else:
                    app_structure["others"].append(relative_path)

    return app_structure


if __name__ == "__main__":
    # Set the path to your React app directory
    app_dir = "/Users/apple/Desktop/NextJS/Git/Tradexx"

    print("Analyzing React app directory...")
    structure = analyze_directory(app_dir)

    # Save the structure as a JSON file for easier viewing
    output_file = os.path.join(app_dir, "app_structure.json")
    with open(output_file, "w") as f:
        json.dump(structure, f, indent=4)

    print(f"Analysis complete. Schema saved to {output_file}")
