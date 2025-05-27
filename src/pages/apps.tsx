import { Layout } from "../components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function Apps() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Apps</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Applications</CardTitle>
            <CardDescription>Manage your applications.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Apps content will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
