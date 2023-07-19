from app import app
from models import *
from flask_bcrypt import Bcrypt
from faker import Faker
from random import randint, choice as rc, sample

fake = Faker()
bcrypt = Bcrypt(app)

def create_users():
    avatars = ["https://d7hftxdivxxvm.cloudfront.net/?height=800&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FqNzvYZT0RbuuyuSyrs6wWw%2Fnormalized.jpg&width=719",
     "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Elliott_Smith.jpg/440px-Elliott_Smith.jpg", 
     "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/MF_Doom_-_Hultsfred_2011_%28cropped%29.jpg/440px-MF_Doom_-_Hultsfred_2011_%28cropped%29.jpg",
     "https://pbs.twimg.com/media/DaT9nhjX4AAiKW-.jpg",
     "https://news.artnet.com/app/news-upload/2014/06/bjork-app-moma-acquisition.jpg",
     "https://pbs.twimg.com/media/EmO-CcJXEAEOrV5.jpg"
     ]

    users = []
    for _ in range(30):
        u = User(
            email = fake.email(),
            username = fake.user_name(),
            full_name = fake.name(),
            password = bcrypt.generate_password_hash("password").decode('utf-8'),
            avatar = rc(avatars)
        )
        users.append(u)

    return users

def create_posts(users):
    images = [
      "https://upload.wikimedia.org/wikipedia/en/b/ba/Radioheadokcomputer.png",
      "https://upload.wikimedia.org/wikipedia/en/f/f6/Kendrick_Lamar_-_To_Pimp_a_Butterfly.png",
      "https://upload.wikimedia.org/wikipedia/en/5/5a/UnknownPleasuresVinyl.jpg",
      "https://upload.wikimedia.org/wikipedia/en/5/5e/Madvillainy_cover.png",
      "https://upload.wikimedia.org/wikipedia/en/8/8a/Mmfood.jpg",
      "https://upload.wikimedia.org/wikipedia/en/4/4b/My_Bloody_Valentine_-_Loveless.png",
      "https://upload.wikimedia.org/wikipedia/en/5/54/Slanted_and_Enchanted_album_cover.jpg",
      "https://i.scdn.co/image/ab67616d0000b2730bebbf72e105d3ac60bd458d",
      "https://upload.wikimedia.org/wikipedia/en/0/02/Radioheadkida.png",
      "https://upload.wikimedia.org/wikipedia/en/1/14/Inrainbowscover.png",
      "https://upload.wikimedia.org/wikipedia/en/4/42/ATribeCalledQuestTheLowEndtheory.jpg",
      "https://upload.wikimedia.org/wikipedia/en/1/16/ATCQMidnightMarauders.jpg",
      "https://upload.wikimedia.org/wikipedia/en/9/90/Liquidswords1995.png",
      "https://upload.wikimedia.org/wikipedia/en/e/e8/MagicalMysteryTourDoubleEPcover.jpg",
      "https://upload.wikimedia.org/wikipedia/en/5/54/Slanted_and_Enchanted_album_cover.jpg",
      "https://upload.wikimedia.org/wikipedia/en/6/64/Pavement_Crooked_Rain.jpg",
      "https://upload.wikimedia.org/wikipedia/en/0/08/Perfect_From_Now_On.jpg",
      "https://upload.wikimedia.org/wikipedia/en/6/60/Teens_of_Denial_Car_Seat_Headrest.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Emergency_%26_I.jpg/440px-Emergency_%26_I.jpg",
      "https://upload.wikimedia.org/wikipedia/en/f/fd/Elliottsmitheitheror55.jpg",
      "https://upload.wikimedia.org/wikipedia/en/e/e3/Elliott_Smith_%28album%29.jpg",
      "https://upload.wikimedia.org/wikipedia/en/3/35/ElliottsmithXOalbumcover.jpg",
      "https://upload.wikimedia.org/wikipedia/en/5/5b/MMLongDrive5075.jpg",
      "https://upload.wikimedia.org/wikipedia/en/f/f5/MMLonesomeCrowdedWest.jpg",
      "https://upload.wikimedia.org/wikipedia/en/3/3f/Katebushhoundsoflove.png",
      "https://upload.wikimedia.org/wikipedia/en/2/25/ArcadeFireFuneralCover.jpg",
      "https://upload.wikimedia.org/wikipedia/en/8/81/Arcade_Fire_-_The_Suburbs.jpg",
      "https://upload.wikimedia.org/wikipedia/en/a/af/GrizzlyBearShields.jpg",
      "https://upload.wikimedia.org/wikipedia/en/a/a2/Beach_House_-_Bloom.png",
      "https://upload.wikimedia.org/wikipedia/en/b/b2/Beach_House_-_Teen_Dream.png",
      "https://upload.wikimedia.org/wikipedia/en/1/14/Bj%C3%B6rk_-_Vespertine_album_cover.png",
      "https://upload.wikimedia.org/wikipedia/en/2/2d/TalkingHeadsRemaininLight.jpg",
      "https://upload.wikimedia.org/wikipedia/en/3/38/Bob_Dylan_-_Blonde_on_Blonde.jpg",
      "https://upload.wikimedia.org/wikipedia/en/0/00/Fiona_Apple_-_Fetch_the_Bolt_Cutters.png",
      "https://upload.wikimedia.org/wikipedia/en/2/27/IllmaticNas.jpg",
      "https://upload.wikimedia.org/wikipedia/en/c/c6/Outkast-atliens.jpg",
      "https://upload.wikimedia.org/wikipedia/en/2/2c/AqueminiOutKast.jpg"
    ]
    posts = []
    for _ in range(300):
        p = Post(
            caption = fake.sentence(),
            image = rc(images),
            user_id = rc([user.id for user in users])
        )
        posts.append(p)
    return posts

def create_likes(users, posts):
    likes = []
    for _ in range(600):
        like = Like(
            user_id = rc([user.id for user in users]),
            post_id = rc([post.id for post in posts])
        )
        likes.append(like)
    return likes

def create_comments(users, posts):
    comments = []
    for _ in range(300):
        comment = Comment(
            user_id = rc([user.id for user in users]),
            post_id = rc([post.id for post in posts]),
            text = fake.sentence()
        )
        comments.append(comment)
    return comments

if __name__ == "__main__":
    with app.app_context():
        User.query.delete()
        Post.query.delete()
        Like.query.delete()
        Comment.query.delete()
    
        users = create_users()
        db.session.add_all(users)
        db.session.commit()
        #Make connections
        for u in users:
            u.following = sample(users)