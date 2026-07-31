import { CreateOrganization } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
  return (
    <section className='flex flex-col items-center justify-center py-10'>
      <h1 className='head-text mb-8'>Create a Community</h1>
      <CreateOrganization
        appearance={{
          baseTheme: dark,
          elements: {
            card: "bg-dark-2 shadow-none border border-dark-4 text-light-1",
            headerTitle: "text-light-1",
            headerSubtitle: "text-light-3",
            formButtonPrimary: "bg-primary-500 text-light-1 hover:bg-primary-600",
          },
        }}
        afterCreateOrganizationUrl='/communities'
      />
    </section>
  );
}
