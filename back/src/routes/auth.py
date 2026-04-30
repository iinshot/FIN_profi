from fastapi import FastAPI

app = FastAPI()

@app.get("/login")
async def login():
    pass

@app.get("/register")
async def register():
    pass

@app.get("/logout")
async def logout():
    pass