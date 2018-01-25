"""Module implementing storage for the app"""

import uuid


class Player:  # pylint: disable=too-few-public-methods
    """A class representing a player of
    monopoly.

    Initialisation of an instance of this class will store
    it in the database automatically. Similarly, any
    mutation of the public fields will result in mutation
    in the database.

    >>> print(Player("dave"))
    dave: []
    """
    def __init__(self, username):
        self.username = username
        self.rolls = []
        self._uuid = uuid.uuid1()

    @property
    def user_id(self):
        """A unique, read-only user id"""
        return self._uuid

    def __str__(self):
        return '%s: %s' % (self.username, self.rolls)

    def __eq__(self, other):
        return self.user_id == other.user_id


class Game:  # pylint: disable=too-few-public-methods
    """A class representing a game of
    monopoly.

    Initialisation of an instance of this class will store
    it in the database automatically. Similarly, any
    mutation of the public fields will result in mutation
    in the database.

    Below test fails until we have an actual database
    />>> print(Game("dave"))
    dave: []
    <BLANKLINE>
    """
    def __init__(self, user_id):
        self.users = [user_id]

    def add_user(self, user_id):
        """Add a new user to the game if not already there.
        """
        if user_id not in self.users:
            self.users += user_id

    def get_rolls(self):
        """Get all dice roll results associated with the game.

        NOTE:Only 1 game exists currently, when many can this must be edited.
        """
        user_rolls = []
        """
        #Cannot currently work without db
        for user_id in self.users:
            user = retrieve_player(user_id)
            user_rolls[user_id] = [user.rolls]
        """
        return user_rolls

    def __str__(self):
        answer = ""
        """
        #Cannot currently work without db
        for user in self.users:
            user = retrieve_player(user)
            answer += '%s: %s\n' % (user.username, user.rolls)
        """
        return answer
    

class DatabaseLookupError(LookupError):
    """Errors for when a key is not found in the database"""
    def __init__(self, key_desc, key_val):
        LookupError.__init__(self)
        self.key_desc = key_desc
        self.key_val = key_val

    def __str__(self):
        return 'Could not find entry for %s key %s' % (self.key_desc,
                                                       self.key_val)


def retrieve_player(user_id):
    """Retieves a player from the database.
    Raises a DatabaseLookupError if not found.

    >>> retrieve_player(123)
    Traceback (most recent call last):
        ...
    backend.storage.DatabaseLookupError: \
Could not find entry for user_id key 123
    """
    raise DatabaseLookupError("user_id", user_id)
