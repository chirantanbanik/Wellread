## Wellread
A blogging application for creative people to express their feelings, thoughts and ideas.

### Tech Stack
**Client**: Reactjs, Redux-toolkit, Tailwind css 

**Server:** Appwrite

**Deployment:** Vercel


### Appwrite Setup
Create an Account by signing up.
![Signup](https://github.com/chirantanbanik/wellread/assets/71392444/01540c55-5211-4762-94b3-524390ae2007)


Create an Project with the name **Wellread** and Select Frankfurt as the region.
![Create Project](https://github.com/chirantanbanik/wellread/assets/71392444/940d2b4c-cf89-4972-af89-19485716c967)

 
Now copy your Project ID near the Wellread and paste it in **VITE_APPWRITE_PROJECT_ID** of your .env file
![Project ID](https://github.com/chirantanbanik/wellread/assets/71392444/ed4e4f34-22fa-4baa-a2ab-6d47ddc1752f)


Now go to the Database and create a Database **blog** and copy your Database ID and paste in your **VITE_APPWRITE_DATABASE_ID** of your .env file
![Database](https://github.com/chirantanbanik/wellread/assets/71392444/b0202409-9311-472d-8807-90ec3610bb18)


Now you need to create an Collection with name **articles** and get the Collection ID to paste it in your **VITE_APPWRITE_COLLECTION_ID** of your .env file
![Collection](https://github.com/chirantanbanik/wellread/assets/71392444/02369e8c-c293-467f-a988-6c5290cf5262)

Go to the setting of the Collection and in the **Update permission** Add the role to **All Users** and checkmark Create, Read, Update, Delete.
![Settings](https://github.com/chirantanbanik/wellread/assets/71392444/6aa7aa45-bc32-49a3-b252-51f15c5b3a71)


Now in Collection go to the **Attributes** and create the following Attributes and for every attributes you need to give 255 as the size.
![Attributes](https://github.com/chirantanbanik/wellread/assets/71392444/447146d5-e0f0-47dc-a4e3-336c9132d721)

See this for a referance
![Values](https://github.com/chirantanbanik/wellread/assets/71392444/53abcf82-084b-4160-b68e-1184fa15955f)


Next to Attributes you will find **Indexes**. Create an index with the following details
![Indexes](https://github.com/chirantanbanik/wellread/assets/71392444/00edb20c-7d46-4244-9644-09f16ca4c8f7)


Now go to Storage and create a bucket with a name **images** and copy the Bucket ID to paste it in your **VITE_APPWRITE_BUCKET_ID** of your .env file.
![Bucket ID](https://github.com/chirantanbanik/wellread/assets/71392444/0f030505-6cd2-46aa-8bda-151d3affddf0)
Now go to the Setting of the Bucket ID and Update the permission of Add a role to **All Users** and checkmark Create, Read, Update and Delete

At last go to the Platform and add **Web** as the Platform. In the name give **Wellread**. 
To know the hostname you need to run the project locally by **npm run dev** and if you get an URL like http://127.0.0.1:5173/ then in this case you will put **127.0.0.1** in hostname and so on for other cases and keep on proceeding to next till you get Go to Dashboard.
![Platform](https://github.com/chirantanbanik/wellread/assets/71392444/b6d422a0-b4fd-4d30-8354-2cb71444f584)


### Run Locally
1. Fork this repository

```bash
https://github.com/chirantanbanik/wellread
```

2. Clone the Forked repository to your system

```bash
git clone your-forked-repository
```

3. Change the directory 

```bash
cd wellread
```

3. Copy the `.env.example` to `.env`

```bash
cp .env.example .env
```

2. Install Packages via npm

```bash
npm install
```

3. Run the React Vite Development Server

```bash
npm run dev
```

## Project Author and Maintainer
- [@chirantanbanik](https://www.linkedin.com/in/chirantanbanik/)

## Our Contributors
<a href="https://github.com/chirantanbanik/Wellread/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=chirantanbanik/Wellread" />
</a>

