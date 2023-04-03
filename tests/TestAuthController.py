import requests


class TestAuthController:
    def test_register_new_user(self):
        register_url = "http://localhost:5274/Auth/Register"

        response = requests.post(
            register_url,
            json={
                "userName": "username",
                "password": "password"
            }
        )

        assert response.status_code == 200

    def test_register_user_with_duplicate_username(self):
        register_url = "http://localhost:5274/Auth/Register"

        response = requests.post(
            register_url,
            json={
                "userName": "username",
                "password": "password"
            }
        )

        assert response.status_code == 422

    def test_login_user(self):
        login_url = "http://localhost:5274/Auth/Login"

        response = requests.post(
            login_url,
            json={
                "userName": "username",
                "password": "password"
            }
        )

        assert response.status_code == 200

    def test_login_user_with_wrong_password(self):
        login_url = "http://localhost:5274/Auth/Login"

        response = requests.post(
            login_url,
            json={
                "userName": "username",
                "password": "password123"
            }
        )

        assert response.status_code == 400

    def test_login_user_with_wrong_username(self):
        login_url = "http://localhost:5274/Auth/Login"

        response = requests.post(
            login_url,
            json={
                "userName": "nameOfUser",
                "password": "password"
            }
        )
