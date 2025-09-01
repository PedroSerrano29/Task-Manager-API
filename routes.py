from flask import request, jsonify
from app import app, db
from models import Task

# Create the database tables
with app.app_context():
    db.create_all()

# Get all tasks
@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks])

# Get task by ID
@app.route("/tasks/<int:task_id>", methods=["GET"])
def get_task(task_id):
    task = Task.query.get_or_404(task_id)
    return jsonify(task.to_dict())

# Add new task
@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.json
    new_task = Task(title=data["title"])
    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.to_dict()), 201

# Update task
@app.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):
    task = Task.query.get_or_404(task_id)
    data = request.json
    task.title = data.get("title", task.title)
    task.done = data.get("done", task.done)
    db.session.commit()
    return jsonify(task.to_dict())

# Delete task
@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted"})
