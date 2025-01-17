import { Card, CardHeader, CardBody, CardFooter, Typography, Input, Checkbox, Button } from "@material-tailwind/react";

export function Register() {
  return (
    <Card className="w-96">
      <CardHeader variant="gradient" color="gray" className="mb-4 grid h-28 place-items-center">
        <Typography variant="h3" color="white">
          Sign Up
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input label="Email" size="lg" />
        <Input label="Password" size="lg" />
        <Input label="Retype Password" size="lg" />
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth>
          Sign Up
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Returning User?
          <Typography as="a" href="/auth/login" variant="small" color="blue-gray" className="ml-1 font-bold">
            Log in
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  );
}
