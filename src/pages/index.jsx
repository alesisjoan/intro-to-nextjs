import Head from 'next/head';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Header from '../components/Header/Header';

export default function Home(props) {
  const { contentPages } = props;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <p className="text-big">
          Vamos a conocer sobre las características principales de{' '}
          <a href="https://nextjs.org">Next.js!</a>
        </p>

        {contentPages && (
          <ol className="text-big list-centered">
            {contentPages.map((page) => (
              <li key={page.id}>
                <Link href="/contents/[slug]" as={`/contents/${page.slug}`}>
                  <a>{page.title}</a>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const pagesDirectory = path.join(
    process.cwd(),
    'src',
    'pages',
    'contents',
    'src'
  );
  const filenames = fs.readdirSync(pagesDirectory);

  const contentPages = filenames.map((filename) => {
    const filePath = path.join(pagesDirectory, filename);
    const id = filename.replace(/\.md$/, '');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const frontmatter = matter(fileContents);

    return {
      id,
      filePath,
      ...frontmatter.data,
    };
  });

  return {
    props: {
      contentPages,
    },
  };
}
