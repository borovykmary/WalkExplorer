from .llm_service import get_route_details, parse_response, filter_response

def process_user_input(user_input, route_style, route_time):
    """
    Process user input to generate a walking route.
    """
    return parse_response(filter_response(get_route_details(user_input, route_style, route_time)))

if __name__ == '__main__':
    user_input = input("Enter your route details: ")
    result = process_user_input(user_input)
    print("Generated Route:", result)