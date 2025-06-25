from flask_restful import Resource, Api
from flask import request, abort, jsonify
from models import Film, Genre, Language, Actor, Cast
from extensions import db
from api.serializers import (movies_schema, movie_schema, 
                           genre_schema, genres_schema,
                           language_schema, languages_schema,
                           actor_schema, actors_schema)

class MovieListAPI(Resource):
    def get(self):
        movies = Film.query.all()
        return {"movies": movies_schema.dump(movies)}
    
    def post(self):
        if not request.json:
            abort(400)
        movie = movie_schema.load(request.get_json(), session=db.session)
        db.session.add(movie)
        db.session.commit()
        return {'movie': movie_schema.dump(movie)}, 201

class MovieAPI(Resource):
    def get(self, id):
        movie = Film.query.get_or_404(id)
        return {"movie": movie_schema.dump(movie)}

    def put(self, id):
        movie = Film.query.get_or_404(id)
        if not request.json:
            abort(400)
        for key, value in request.json.items():
            setattr(movie, key, value)
        db.session.commit()
        return {'movie': movie_schema.dump(movie)}

    def delete(self, id):
        movie = Film.query.get_or_404(id)
        db.session.delete(movie)
        db.session.commit()
        return {'result': True}

class MovieStatsAPI(Resource):
    def get(self, field):
        valid_fields = ['rating', 'budget']
        if field not in valid_fields:
            abort(400, description=f"Invalid field. Must be one of: {', '.join(valid_fields)}")
        
        field_name = f'film_{field}'
        result = db.session.query(
            db.func.min(getattr(Film, field_name)).label('min'),
            db.func.max(getattr(Film, field_name)).label('max'),
            db.func.avg(getattr(Film, field_name)).label('avg')
        ).first()
        
        return {
            "stats": {
                "field": field,
                "min": float(result.min) if result.min else 0,
                "max": float(result.max) if result.max else 0,
                "avg": float(result.avg) if result.avg else 0
            }
        }

class GenreListAPI(Resource):
    def get(self):
        genres = Genre.query.all()
        return {"genres": genres_schema.dump(genres)}

class GenreAPI(Resource):
    def get(self, id):
        genre = Genre.query.get_or_404(id)
        return {"genre": genre_schema.dump(genre)}

class LanguageListAPI(Resource):
    def get(self):
        languages = Language.query.all()
        return {"languages": languages_schema.dump(languages)}

class LanguageAPI(Resource):
    def get(self, id):
        language = Language.query.get_or_404(id)
        return {"language": language_schema.dump(language)}

class ActorListAPI(Resource):
    def get(self):
        actors = Actor.query.all()
        return {"actors": actors_schema.dump(actors)}

class ActorAPI(Resource):
    def get(self, id):
        actor = Actor.query.get_or_404(id)
        return {"actor": actor_schema.dump(actor)}
