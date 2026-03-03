import { Modal } from '@/components/molecules/Modal'
import { Button } from '@/components/atoms/Button'
import { Lock } from 'lucide-react'

interface UnlockContactModalProps {
    isOpen: boolean
    onClose: () => void
}

export function UnlockContactModal({ isOpen, onClose }: UnlockContactModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Ontgrendel contactgegevens"
            className="sm:max-w-md"
        >
            <div className="space-y-6">
                <div className="flex justify-center py-4">
                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center text-primary-600">
                        <Lock className="w-8 h-8" />
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="text-center text-gray-600">
                        Je hebt een pro-zoekopdracht uitgevoerd. Kies hoe je toegang wilt krijgen tot de contactgegevens.
                    </p>

                    <div className="flex justify-between gap-3">
                        <Button
                            variant="outline"
                            className="flex-1 justify-center h-auto py-2 whitespace-normal text-center text-sm font-medium border-primary-200 hover:bg-primary-50 hover:text-primary-700"
                            onClick={() => window.location.href = "https://www.larton.nl/snapshot-contactgegevens/"}
                        >
                            Ontgrendel alleen deze selectie
                        </Button>

                        <Button
                            className="flex-1 justify-center h-auto py-2 whitespace-normal text-center text-sm font-medium bg-primary-dark text-white hover:bg-primary-700"
                            onClick={() => window.location.href = "https://www.larton.nl/pro/"}
                        >
                            Activeer volledige database
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
