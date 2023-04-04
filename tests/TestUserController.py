import uuid

import requests


def generate_new_username():
    return str(uuid.uuid4()).replace('-', '')[:30]


def register(name):
    register_url = "http://localhost:5274/Auth/Register"

    response = requests.post(
        register_url,
        json={
            "userName": name,
            "password": "password"
        }
    )

    JWT = response.content.decode("UTF-8")
    return JWT


class TestUserController:
    def test_search_by_username(self):
        username = generate_new_username()
        register(username)

        search_user_url = f"http://localhost:5274/User/byUsername/{username}"
        response = requests.get(
            search_user_url
        )

        assert response.status_code == 200

    def test_search_by_wrong_username(self):
        username = generate_new_username()

        search_user_url = f"http://localhost:5274/User/byUsername/{username}"
        response = requests.get(
            search_user_url
        )

        assert response.status_code == 404

    def test_deleting_of_user(self):
        username = generate_new_username()
        token = register(username)

        headers = {"Authorization": f"Bearer {token}"}

        delete_user_url = f"http://localhost:5274/User/{username}"
        response = requests.delete(
            delete_user_url,
            headers=headers
        )

        assert response.status_code == 200

    def test_deleting_of_nonexistent_user(self):
        username = generate_new_username()
        badusername = generate_new_username()
        token = register(username)

        headers = {"Authorization": f"Bearer {token}"}

        delete_user_url = f"http://localhost:5274/User/{badusername}"
        response = requests.delete(
            delete_user_url,
            headers=headers
        )

        assert response.status_code == 404

    def test_deleting_of_user_as_other_user(self):
        username = generate_new_username()
        username2 = generate_new_username()
        register(username)
        token = register(username2)

        headers = {"Authorization": f"Bearer {token}"}

        delete_user_url = f"http://localhost:5274/User/{username}"
        response = requests.delete(
            delete_user_url,
            headers=headers
        )

        assert response.status_code == 401
