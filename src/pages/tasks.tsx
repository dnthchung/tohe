import { Layout } from "../components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function Tasks() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Task Management</CardTitle>
            <CardDescription>Manage your tasks and projects.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Task content will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
