import openai

def extract_route_details(user_input):
    """
    Use OpenAI API to process user input and extract route details.
    """
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "Extract start, waypoints, and end point from user input."},
            {"role": "user", "content": user_input}
        ]
    )
    return response['choices'][0]['message']['content']  # Parsed JSON-like data
