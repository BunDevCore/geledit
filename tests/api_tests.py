import requests

base_url = "http://localhost:5274"


def register(username, password):
    register_url = base_url + "/Auth/Register"

    response = requests.post(
        register_url,
        json={
            "userName": username,
            "password": password
        }
    )

    JWT = response.content.decode("UTF-8")

    if response.status_code != 200:
        print(f"Error [register] {response.content}")
        exit()

    print("Logged in")

    return JWT


def create_note(headers, title):
    new_note_url = base_url + "/Note/new"

    response = requests.post(
        new_note_url,
        json={
            "title": title
        },
        headers=headers
    )

    note_id = response.json()

    print(f"Created new note with id: {note_id}")

    return note_id


def get_all_notes(header):
    get_note_url = base_url + f"/Note"
    response = requests.get(
        get_note_url,
        headers=headers
    )
    if response.status_code == 200:
        print(f"List of notes:\n{response.content}")
    else:
        print(f"Error [get_all_notes] {response.headers}")
        exit()


def get_note(header, note_id):
    get_note_url = base_url + f"/Note/{note_id}"
    response = requests.get(
        get_note_url,
        headers=headers
    )
    if response.status_code == 200:
        print(f"Note: {note_id} exists and can be accesed\n{response.content}")
    else:
        print(f"Error [get_note] {response.content}")
        exit()


def delete_note(headers, note_id):
    delete_note_url = base_url + f"/Note/{note_id}"
    response = requests.delete(
        delete_note_url,
        headers=headers
    )
    if response.status_code == 200:
        print(f"Note: {note_id} was deleted")
    else:
        print(f"Error [delete_note] {response.content}")
        exit()


def add_guest_to_note(headers, note_id, username):
    add_guest_url = base_url + f"/Note/{note_id}/guest"
    response = requests.post(
        add_guest_url,
        json=username,
        headers=headers
    )
    if response.status_code == 200:
        print(f"Guest: {username} was added to note: {note_id}")
    else:
        print(f"Error [add_guest_to_note] {response.content}")
        exit()


def delete_guest_from_note(headers, note_id, username):
    delete_guest_url = base_url + f"/Note/{note_id}/guest"
    response = requests.delete(
        delete_guest_url,
        json=username,
        headers=headers
    )
    if response.status_code == 200:
        print(f"Guest: {username} was deleted from note: {note_id}")
    else:
        print(f"Error [delete_guest_from_note] {response.content}")
        exit()


user = "strinasdassag"
user2 = "usernumeroduo"

token = register(user, "stringify")
token2 = register(user2, "usernameIsHere...Right?")

headers = {"Authorization": f"Bearer {token}"}
headers2 = {"Authorization": f"Bearer {token2}"}

note = create_note(headers, "title")
note2 = create_note(headers, "ThatTitle")
note3 = create_note(headers, "Huh")

get_note(headers, note)

add_guest_to_note(headers, note, user2)

get_note(headers, note)

delete_guest_from_note(headers, note, user2)

delete_note(headers, note2)

# print(response)
# print(response.headers)
# print(response.content)
