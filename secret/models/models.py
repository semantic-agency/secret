from secret.extensions import db


class Entries(db.Model):
    """Database model for entry links."""

    __tablename__ = "links"

    id = db.Column(db.Integer, primary_key=True)
    encrypted_text = db.Column(db.LargeBinary)
    date_created = db.Column(db.DateTime)
    date_expires = db.Column(db.DateTime, nullable=True)
    slug_link = db.Column(db.String(20), unique=True, nullable=False)

    def __repr__(self):
        return f"<Entry {self.slug_link}>"
