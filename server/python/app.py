from flask import Flask, request, jsonify
from flask_cors import CORS
import redis
import json
import ollama
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Redis connection
redis_client = redis.Redis(
    host=os.getenv('REDIS_HOST', 'localhost'),
    port=int(os.getenv('REDIS_PORT', 6379)),
    password=os.getenv('REDIS_PASSWORD', None),
    ssl=os.getenv('REDIS_TLS', 'false').lower() == 'true'
)

def create_task(title, description=None, priority='medium'):
    task_id = redis_client.incr('task_id_counter')
    task = {
        'id': str(task_id),
        'title': title,
        'description': description,
        'priority': priority,
        'status': 'open',
        'createdAt': datetime.now().isoformat(),
        'updatedAt': datetime.now().isoformat()
    }
    redis_client.hset(f'task:{task_id}', mapping=task)
    return task

def create_ticket(title, description, priority='medium'):
    ticket_id = redis_client.incr('ticket_id_counter')
    ticket = {
        'id': str(ticket_id),
        'title': title,
        'description': description,
        'priority': priority,
        'status': 'open',
        'createdAt': datetime.now().isoformat(),
        'updatedAt': datetime.now().isoformat()
    }
    redis_client.hset(f'ticket:{ticket_id}', mapping=ticket)
    return ticket

@app.route('/api/ai/analyze', methods=['POST'])
def analyze():
    data = request.json
    prompt = data.get('prompt')
    
    try:
        # Process the prompt to understand the intent
        intent_prompt = f"""Analyze this request and determine the action needed:
        Request: {prompt}
        Return a JSON with:
        - action: 'query' | 'create_task' | 'create_ticket' | 'analyze'
        - parameters: relevant parameters for the action
        """
        
        intent_response = ollama.generate(
            model='llama2',
            prompt=intent_prompt,
            stream=False
        )
        
        intent_data = json.loads(intent_response['response'])
        
        if intent_data['action'] == 'create_task':
            task = create_task(
                title=intent_data['parameters']['title'],
                description=intent_data['parameters'].get('description'),
                priority=intent_data['parameters'].get('priority', 'medium')
            )
            return jsonify({
                'response': f"I've created a new task: {task['title']}",
                'data': task,
                'type': 'task'
            })
            
        elif intent_data['action'] == 'create_ticket':
            ticket = create_ticket(
                title=intent_data['parameters']['title'],
                description=intent_data['parameters']['description'],
                priority=intent_data['parameters'].get('priority', 'medium')
            )
            return jsonify({
                'response': f"I've created a new ticket: {ticket['title']}",
                'data': ticket,
                'type': 'ticket'
            })
            
        elif intent_data['action'] == 'query':
            # Handle data queries
            query_prompt = f"""Based on this request, analyze the data and provide insights:
            Request: {prompt}
            Data: {json.dumps(get_relevant_data(intent_data['parameters']))}
            """
            
            analysis = ollama.generate(
                model='llama2',
                prompt=query_prompt,
                stream=False
            )
            
            return jsonify({
                'response': analysis['response'],
                'type': 'analysis'
            })
            
        else:
            # Default to general analysis
            analysis = ollama.generate(
                model='llama2',
                prompt=prompt,
                stream=False
            )
            
            return jsonify({
                'response': analysis['response'],
                'type': 'analysis'
            })
            
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

def get_relevant_data(parameters):
    data = {}
    
    if 'tasks' in parameters:
        tasks = []
        for key in redis_client.scan_iter("task:*"):
            task = redis_client.hgetall(key)
            if task:
                tasks.append(task)
        data['tasks'] = tasks
        
    if 'tickets' in parameters:
        tickets = []
        for key in redis_client.scan_iter("ticket:*"):
            ticket = redis_client.hgetall(key)
            if ticket:
                tickets.append(ticket)
        data['tickets'] = tickets
        
    return data

if __name__ == '__main__':
    app.run(port=3001)