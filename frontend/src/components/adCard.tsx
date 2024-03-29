import styles from "@/styles/AdCard.module.css";

export type AdCardProps = {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  createdAt: Date;
  imageUrl: string;
  category: CategoryProps;
  tags: Tags[];
  user: UserProps;
};

export type UserProps = {
  id: number;
  email: string;
};

export type CategoryProps = {
  id: number;
  title: string;
};

export type Tags = {
  id: number;
  title: string;
};

export type AddCardWithActionsProps = AdCardProps & {
  onAddToBasket: (item: AdCardProps) => void;
  onDelete: (item: AdCardProps) => void;
};

export default function AdCard(
  props: AddCardWithActionsProps
): React.ReactNode {
  function addToCart(item: AdCardProps): void {
    props.onAddToBasket(item);
  }

  function deleteProduct(item: AdCardProps): void {
    props.onDelete(item);
  }

  return (
    <div className={styles.adCardContainer}>
      <a className={styles.adCardLink} href={`/ads/${props.id}`}>
        <img
          className={styles.adCardImage}
          src={props.imageUrl}
          alt={props.title}
        />
        <div className={styles.adCardText}>
          <div className={styles.adCardTitle}>{props.title}</div>
          <div className={styles.adCardPrice}>{props.price} €</div>
        </div>
      </a>
      <div className={styles.tagsContainer}>
        {props.tags?.map((item, i) => (
          <span className={styles.tags} key={i}>
            {item.title}
          </span>
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        <button className="button link-button" onClick={() => addToCart(props)}>
          <span>Ajouter au panier</span>
        </button>
        <button
          className="button-red link-button"
          onClick={() => deleteProduct(props)}
        >
          <span>Supprimer</span>
        </button>
      </div>
    </div>
  );
}
