from flask import Flask, render_template, request
from flask_cors import CORS
from flask_restful import Api
from models import Film, Genre, Language, Actor, Cast
from sqlalchemy import func
from extensions import db, ma
from api.resources import (MovieListAPI, MovieAPI, MovieStatsAPI,
                          GenreListAPI, GenreAPI,
                          LanguageListAPI, LanguageAPI,
                          ActorListAPI, ActorAPI)

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///movies.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.json.ensure_ascii = False

    db.init_app(app)
    ma.init_app(app)
    api = Api(app)
    
    api.add_resource(MovieListAPI, '/api/v1/movies')
    api.add_resource(MovieAPI, '/api/v1/movies/<int:id>')
    api.add_resource(MovieStatsAPI, '/api/v1/movies/stats/<string:field>')
    
    api.add_resource(GenreListAPI, '/api/v1/genres')
    api.add_resource(GenreAPI, '/api/v1/genres/<int:id>')
    
    api.add_resource(LanguageListAPI, '/api/v1/languages')
    api.add_resource(LanguageAPI, '/api/v1/languages/<int:id>')
    
    api.add_resource(ActorListAPI, '/api/v1/actors')
    api.add_resource(ActorAPI, '/api/v1/actors/<int:id>')

    with app.app_context():
        db.create_all()

    @app.route('/database', methods=['GET'])
    def show_database():
        selected_table = request.args.get('table', 'films') 

        data = {
            "films": Film.query.all(),
            "genres": Genre.query.all(),
            "languages": Language.query.all(),
            "actors": Actor.query.all(),
            "cast": Cast.query.all()
        }

        return render_template("database.twig", tables=data.keys(), selected_table=selected_table, data=data[selected_table])

    @app.route('/queries')
    def queries():
        query_option = request.args.get("query", "genre_counts")

        queries_dict = {
            "genre_counts": ("Количество фильмов в каждом жанре", 
                db.session.query(Genre.genre_name, func.count(Film.film_id))
                .join(Film)
                .group_by(Genre.genre_name)
                .all()),

            "avg_rating_by_language": ("Средний рейтинг фильмов по языку", 
                db.session.query(Language.language_name, func.avg(Film.film_rating))
                .join(Film)
                .group_by(Language.language_name)
                .all()),

            "max_rating_by_language": ("Максимальный рейтинг фильмов по языку", 
                db.session.query(Language.language_name, func.max(Film.film_rating))
                .join(Film)
                .group_by(Language.language_name)
                .all()),

            "min_rating_by_language": ("Минимальный рейтинг фильмов по языку", 
                db.session.query(Language.language_name, func.min(Film.film_rating))
                .join(Film)
                .group_by(Language.language_name)
                .all()),

            "most_expensive_film": ("Самый дорогой фильм в каждом жанре", 
                db.session.query(Genre.genre_name, Film.film_name, func.max(Film.film_budget))
                .join(Film)
                .group_by(Genre.genre_name)
                .all()),

            "avg_rating_by_genre": ("Средний рейтинг фильмов по жанру", 
                db.session.query(Genre.genre_name, func.avg(Film.film_rating))
                .join(Film)
                .group_by(Genre.genre_name)
                .all()),

            "max_rating_by_genre": ("Максимальный рейтинг фильмов по жанру", 
                db.session.query(Genre.genre_name, func.max(Film.film_rating))
                .join(Film)
                .group_by(Genre.genre_name)
                .all()),

            "min_rating_by_genre": ("Минимальный рейтинг фильмов по жанру", 
                db.session.query(Genre.genre_name, func.min(Film.film_rating))
                .join(Film)
                .group_by(Genre.genre_name)
                .all()),

            "actors_per_film": ("Количество актеров в каждом фильме", 
                db.session.query(Film.film_name, func.count(Cast.actor_id))
                .join(Cast)
                .group_by(Film.film_name)
                .all()),

            "avg_budget_by_genre": ("Средний бюджет фильмов по жанру", 
                db.session.query(Genre.genre_name, func.avg(Film.film_budget))
                .join(Film)
                .group_by(Genre.genre_name)
                .all())
        }

        title, result = queries_dict.get(query_option, queries_dict["genre_counts"])

        return render_template("queries.twig", title=title, result=result, selected_query=query_option)

    return app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
