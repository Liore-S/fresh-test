import { Handlers, PageProps } from "$fresh/server.ts";

interface User {
    login: string;
    name: string;
    avatar_url: string;
    html_url: string;
}

export const handler: Handlers<User | null> = {
    async GET(_,ctx) {
        const resp = await fetch(`https://api.github.com/users/${ctx.params.username}`);
        if (resp.status === 404) {
            return ctx.render(null);
        }
        const user: User = await resp.json();
        return ctx.render(user);
    }
}

export default function Page({ data }: PageProps<User | null>) {
    if (!data) {
        return (
            <main>
                <h1>Not Found</h1>
                <p>Sorry, we couldn't find that user.</p>
            </main>
        );
    } else {
        return (
            <main>
                <div class='flex flex-col items-center my-5 mb--5 h-full'>
                    <img 
                    src={data.avatar_url} alt={data.name} width={64} height={64} 
                    class='rounded-md shadow-md mb-2'
                    />
                    <h1 class='text-2xl font-bold'
                    >{data.name}</h1>
                    <p>
                        <a href={data.html_url}>@{data.login}</a>
                    </p>
                </div>
            </main>
        );
    }
}