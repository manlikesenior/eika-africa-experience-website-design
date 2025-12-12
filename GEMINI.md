# GEMINI.md

## Project Overview

This is a Next.js web application for "Eika Africa Experience", a company that provides safari tours and travel experiences in Kenya and other parts of Africa. The project was bootstrapped using [v0.app](https://v0.app) and is deployed on Vercel.

The application uses a variety of modern web technologies, including:

*   **Framework:** [Next.js](https://nextjs.org/) (React framework)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [Radix UI](https://www.radix-ui.com/) and [shadcn/ui](https://ui.shadcn.com/)
*   **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
*   **Forms:** [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/)
*   **Email:** [Resend](https://resend.com/)
*   **Analytics:** [Vercel Analytics](https://vercel.com/analytics)

## Architecture

The project follows the standard Next.js App Router architecture.

*   `app/`: Contains the application's pages and layouts.
*   `components/`: Contains reusable React components.
*   `lib/`: Contains utility functions and third-party library configurations (e.g., Supabase client).
*   `public/`: Contains static assets like images and fonts.

The application uses a combination of Server Components and Client Components. Server Components are used for fetching data and rendering static content, while Client Components are used for interactive UI elements.

## Building and Running

To run this project locally, you will need to have Node.js and pnpm installed.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/pjohnsonwrites/eika-africa-experience-website-design.git
    ```

2.  **Install dependencies:**

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of the project and add the following environment variables:

    ```
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```

    You can find these values in your Supabase project settings.

4.  **Run the development server:**

    ```bash
    pnpm dev
    ```

    The application will be available at `http://localhost:3000`.

### Other Commands

*   `pnpm build`: Creates a production build of the application.
*   `pnpm start`: Starts the production server.
*   `pnpm lint`: Lints the codebase for errors.

## Development Conventions

*   **Styling:** The project uses Tailwind CSS for styling. It is recommended to use Tailwind's utility classes for styling whenever possible.
*   **Components:** The project uses Radix UI and shadcn/ui for its UI components. It is recommended to use these components whenever possible to maintain a consistent look and feel.
*   **Code Quality:** The project uses ESLint for code quality. It is recommended to run the linter before committing any changes.
