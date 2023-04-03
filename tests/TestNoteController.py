import requests


def register(name):
    register_url = "http://localhost:5274/Auth/Register"

    response = requests.post(
        register_url,
        json={
            "userName": name,
            "password": "password"
        }
    )

    token = response.content.decode("UTF-8")
    return token


def create_note(token, title):
    new_note_url = "http://localhost:5274/Note/new"
    headers = {"Authorization": f"Bearer {token}"}

    response = requests.post(
        new_note_url,
        json={
            "title": title
        },
        headers=headers
    )
    return response.json()


def add_guest_to_note(token, note_id, guest_username):
    add_guest_to_note_url = f"http://localhost:5274/Note/{note_id}/guest"
    headers = {"Authorization": f"Bearer {token}"}

    response = requests.post(
        add_guest_to_note_url,
        json={
            "username": guest_username
        },
        headers=headers
    )


class TestNoteController:
    def test_getting_note_by_id(self):
        token = register("getNoteById")
        note_id = create_note(token, "note")

        get_note_by_id_url = f"http://localhost:5274/Note/{note_id}"
        headers = {"Authorization": f"Bearer {token}"}

        response = requests.get(
            get_note_by_id_url,
            headers=headers
        )

        assert response.status_code == 200

    def test_getting_note_by_wrong_id(self):
        note_id = 420

        get_note_by_id_url = f"http://localhost:5274/Note/{note_id}"

        response = requests.get(
            get_note_by_id_url
        )

        assert response.status_code == 404

    def test_add_guest_to_note(self):
        guest_username = "guest"

        token = register("TheOwner")
        register(guest_username)

        note_id = create_note(token, "Please cooperate")

        headers = {"Authorization": f"Bearer {token}"}

        add_guest_to_note_url = f"http://localhost:5274/Note/{note_id}/guest"

        response = requests.post(
            add_guest_to_note_url,
            json={
                "username": guest_username
            },
            headers=headers
        )

        assert response.status_code == 200

    def test_add_guest_to_nonexistent_note(self):
        guest_username = "TheBadGuest"

        token = register("I_AM_THE_REAL_OWNER")
        register(guest_username)

        note_id = create_note(token, "Please cooperate 2")
        bad_note_id = 420

        headers = {"Authorization": f"Bearer {token}"}

        add_guest_to_note_url = f"http://localhost:5274/Note/{bad_note_id}/guest"

        response = requests.post(
            add_guest_to_note_url,
            json={
                "username": guest_username
            },
            headers=headers
        )

        assert response.status_code == 404

    def test_add_nonexistent_guest_to_note(self):
        guest_username = "TheGuest"
        bad_guest_username = "null"
        token = register("TheOtherSideOfOwner")
        register(guest_username)

        note_id = create_note(token, "Please cooperate 3")

        headers = {"Authorization": f"Bearer {token}"}

        add_guest_to_note_url = f"http://localhost:5274/Note/{note_id}/guest"

        response = requests.post(
            add_guest_to_note_url,
            json={
                "username": bad_guest_username
            },
            headers=headers
        )

        assert response.status_code == 404

    def test_add_guest_to_note_while_unauthorized(self):
        guest_username = "Bruh"

        token = register("Moment")
        bad_token = register("IWantToBeTheOwnerButICant")
        register(guest_username)

        note_id = create_note(token, "Please cooperate 4")

        headers = {"Authorization": f"Bearer {bad_token}"}

        add_guest_to_note_url = f"http://localhost:5274/Note/{note_id}/guest"

        response = requests.post(
            add_guest_to_note_url,
            json={
                "username": guest_username
            },
            headers=headers
        )

        assert response.status_code == 401

    def test_deleting_note(self):
        token = register("TheDeleterUno")
        note_id = create_note(token, "note")

        get_note_by_id_url = f"http://localhost:5274/Note/{note_id}"
        headers = {"Authorization": f"Bearer {token}"}

        response = requests.get(
            get_note_by_id_url,
            headers=headers
        )

        assert response.status_code == 200

    def test_deleting_nonexistent_note(self):
        token = register("TheDeleterDuo")
        note_id = 621

        get_note_by_id_url = f"http://localhost:5274/Note/{note_id}"
        headers = {"Authorization": f"Bearer {token}"}

        response = requests.get(
            get_note_by_id_url,
            headers=headers
        )

        assert response.status_code == 404

    def test_deleting_guest_from_note(self):
        guest_username = "wiKapo"

        token = register("Lempek")
        register(guest_username)
        note_id = create_note(token, "Fun with guests")
        add_guest_to_note(token, note_id, guest_username)

        delete_guest_from_note_url = f"http://localhost:5274/Note/{note_id}/guest"

        headers = {"Authorization": f"Bearer {token}"}

        response = requests.delete(
            delete_guest_from_note_url,
            json={
                "username": guest_username
            },
            headers=headers
        )

        assert response.status_code == 200

    def test_deleting_guest_from_nonexistent_note(self):
        guest_username = "Infinifen"

        token = register("Pentafen")
        register(guest_username)
        note_id = create_note(token, "Fun with guests")
        add_guest_to_note(token, note_id, guest_username)
        bad_note_id = 20

        delete_guest_from_note_url = f"http://localhost:5274/Note/{bad_note_id}/guest"

        headers = {"Authorization": f"Bearer {token}"}

        response = requests.delete(
            delete_guest_from_note_url,
            json={
                "username": guest_username
            },
            headers=headers
        )

        assert response.status_code == 404

    def test_deleting_nonexistent_guest_from_note(self):
        guest_username = "Fenoftaleina"
        bad_guest_username = "Fenoloftaleina"
        token = register("TheLTaker")
        register(guest_username)
        note_id = create_note(token, "Fun with guests")
        add_guest_to_note(token, note_id, guest_username)

        delete_guest_from_note_url = f"http://localhost:5274/Note/{note_id}/guest"

        headers = {"Authorization": f"Bearer {token}"}

        response = requests.delete(
            delete_guest_from_note_url,
            json={
                "username": bad_guest_username
            },
            headers=headers
        )

        assert response.status_code == 404

    def test_deleting_guest_from_note_while_unauthorized(self):
        guest_username = "numer1"
        bad_user = "numer2"
        token = register("numer3")
        register(guest_username)
        bad_token = register(bad_user)
        note_id = create_note(token, "Fun with guests")
        add_guest_to_note(token, note_id, guest_username)

        delete_guest_from_note_url = f"http://localhost:5274/Note/{note_id}/guest"

        headers = {"Authorization": f"Bearer {bad_token}"}

        response = requests.delete(
            delete_guest_from_note_url,
            json={
                "username": guest_username
            },
            headers=headers
        )

        assert response.status_code == 401