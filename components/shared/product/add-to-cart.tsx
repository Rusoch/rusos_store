"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { Cart, CartItem } from "@/types";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { toast } from "sonner";
import { useTransition } from "react";
const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const handleAddToCart = async () => {
		startTransition(async () => {
			const res = await addItemToCart(item);
			if (!res.success) {
				toast.error(res.message, {
					dismissible: true,
					style: {
						background: "red",
					},
				});
				return;
			}
			//handle success add to cart
			toast(`${item.name} - ${res.message}`, {
				action: {
					label: "Go To Cart",
					onClick: () => router.push("/cart"),
				},
				dismissible: true,
				//additional options here
			});

			return;
		});
	};
	//Handle remove from cart
	const handleRemoveFromCart = async () => {
		startTransition(async () => {
			const res = await removeItemFromCart(item.productId);
			toast.error(res.message, {
				dismissible: true,
				style: {
					background: "red",
				},
			});
			return;
		});
	};
	//check if item is in cart
	const existItem =
		cart && cart.items.find((x) => x.productId === item.productId);
	return existItem ? (
		<div>
			<Button type="button" variant="outline" onClick={handleRemoveFromCart}>
				{isPending ? (
					<Loader className="w-4 h-4 animate-spin" />
				) : (
					<Minus className="h-4 w-4" />
				)}
			</Button>
			<span className="px-2">{existItem.qty}</span>

			<Button type="button" variant="outline" onClick={handleAddToCart}>
				{isPending ? (
					<Loader className="w-4 h-4 animate-spin" />
				) : (
					<Plus className="h-4 w-4" />
				)}
			</Button>
		</div>
	) : (
		<Button className="w-full" type="button" onClick={handleAddToCart}>
			Add to Cart
			{isPending && <Loader className="w-4 h-4 animate-spin" />}
		</Button>
	);
};
export default AddToCart;
