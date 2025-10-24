import React, { ReactNode } from "react"

type ErrorBoundaryComponent = {
    children: ReactNode,
    fallback: ReactNode
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryComponent> {
    state = { hasError: false }
    
    static getDerivedStateFromError(error: Error) {
        console.log(error)
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log(error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback
        }
        return this.props.children
    }
}