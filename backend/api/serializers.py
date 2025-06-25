from extensions import ma, db
from models import Film, Genre, Language, Actor

class GenreSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Genre

class LanguageSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Language

class ActorSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Actor

class MovieSchema(ma.SQLAlchemyAutoSchema):
    genre = ma.Nested(GenreSchema)
    language = ma.Nested(LanguageSchema)
    actors = ma.Nested(ActorSchema, many=True)

    class Meta:
        model = Film
        include_fk = True
        load_instance = True
        sqla_session = db.session

movie_schema = MovieSchema()
movies_schema = MovieSchema(many=True)

genre_schema = GenreSchema()
genres_schema = GenreSchema(many=True)

language_schema = LanguageSchema()
languages_schema = LanguageSchema(many=True)

actor_schema = ActorSchema()
actors_schema = ActorSchema(many=True)
