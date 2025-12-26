import { PageShell } from "@/components/templates/PageShell"
import { Button } from "@/components/atoms/Button"

export function AdminPage() {
    return (
        <PageShell>
            <div className="flex-1 flex items-center justify-center p-6 md:p-8">
                <div className="w-full max-w-4xl">
                    <div className="space-y-8">
                        {/* Header Section */}
                        <div className="space-y-2">
                            <h1 className="text-4xl font-bold text-text-primary">Admin Dashboard</h1>
                            <p className="text-text-secondary text-lg">Manage and monitor your recruitment system</p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { label: "Active Candidates", value: "1,234" },
                                { label: "Pending Reviews", value: "56" },
                                { label: "Completed Interviews", value: "892" }
                            ].map((stat) => (
                                <div key={stat.label} className="p-6 rounded-lg bg-card border border-border">
                                    <p className="text-text-secondary text-sm font-medium">{stat.label}</p>
                                    <p className="text-3xl font-bold text-text-primary mt-2">{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-text-primary">Quick Actions</h2>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    View All Candidates
                                </Button>
                                <Button variant="outline" className="border-border text-text-primary hover:bg-accent">
                                    Review Pending
                                </Button>
                                <Button variant="outline" className="border-border text-text-primary hover:bg-accent">
                                    System Settings
                                </Button>
                            </div>
                        </div>

                        {/* Activity Section */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-text-primary">Recent Activity</h2>
                            <div className="space-y-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="p-4 rounded-lg bg-card border border-border">
                                        <p className="text-text-primary font-medium">Candidate screening completed</p>
                                        <p className="text-text-secondary text-sm mt-1">2 hours ago</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageShell>
    )
}
