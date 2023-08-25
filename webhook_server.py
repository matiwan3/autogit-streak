from flask import Flask
import subprocess

app = Flask(__name__)

@app.route('/update-repo', methods=['POST'])
def update_repo():
    subprocess.run(['git', 'pull', 'origin', 'main'])
    subprocess.run(['git', 'commit', '-am', 'Update from endpoint'])
    subprocess.run(['git', 'push', 'origin', 'main'])
    return "Repository updated!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
